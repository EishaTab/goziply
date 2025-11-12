"use client";
import { useState, useEffect } from "react";
import { MapPin, Search, PlusCircle, Briefcase, User } from "lucide-react";

export default function TaskManager() {
  const [queryAdder, setQueryAdder] = useState("");
  const [queryFinder, setQueryFinder] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null); // 'adder' | 'finder' | null

  const [adderLocation, setAdderLocation] = useState(null);
  const [finderLocation, setFinderLocation] = useState(null);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskPerson, setTaskPerson] = useState("");
  const [adderStatus, setAdderStatus] = useState({ message: "", type: "" });

  const [searchTask, setSearchTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // debounced suggestions fetch when activeInput and its query change
  useEffect(() => {
    const currentQuery = activeInput === "adder" ? queryAdder : activeInput === "finder" ? queryFinder : "";
    if (!activeInput || currentQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          currentQuery
        )}`;
        const res = await fetch(url, { signal: controller.signal, headers: { "Accept-Language": "en" } });
        if (!res.ok) return;
        const data = await res.json();
        setSuggestions(data || []);
      } catch (err) {
        if (err.name !== "AbortError") console.error("Suggestion fetch error:", err);
      }
    };

    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [activeInput, queryAdder, queryFinder]);

  // use onMouseDown to avoid input blur removing suggestions before click registers
  const handleLocationSelect = (place) => {
    if (activeInput === "adder") {
      setAdderLocation(place);
      setQueryAdder(place.display_name); // keep the selected label in the query state
    } else if (activeInput === "finder") {
      setFinderLocation(place);
      setQueryFinder(place.display_name);
    }
    setSuggestions([]);
    setActiveInput(null);
  };

  async function addTask(e) {
    e.preventDefault();
    if (!adderLocation || !taskTitle || !taskPerson) {
      setAdderStatus({ message: "Please fill all fields and select a location.", type: "error" });
      return;
    }
    try {
      const res = await fetch("/api/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskTitle,
          person: taskPerson,
          lat: parseFloat(adderLocation.lat),
          lon: parseFloat(adderLocation.lon),
        }),
      });
      const data = await res.json();
      setAdderStatus(
        data.success ? { message: "Task saved successfully!", type: "success" } : { message: `Error: ${data.error}`, type: "error" }
      );
      if (data.success) {
        setTaskTitle("");
        setTaskPerson("");
        setQueryAdder("");
        setAdderLocation(null);
        setActiveInput(null);
      }
      setTimeout(() => setAdderStatus({ message: "", type: "" }), 3000);
    } catch (err) {
      console.error(err);
      setAdderStatus({ message: "Network error", type: "error" });
    }
  }

  async function searchTasks(e) {
    e.preventDefault();
    if (!finderLocation) {
      alert("Please select your location first.");
      return;
    }
    setIsSearching(true);
    setTasks([]);
    try {
      const res = await fetch("/api/find-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: parseFloat(finderLocation.lat),
          lon: parseFloat(finderLocation.lon),
          title: searchTask,
        }),
      });
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  }

  const btnPrimary =
    "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md transition duration-200 text-sm font-semibold bg-slate-800 text-white hover:bg-slate-900";

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 p-4 sm:p-6 lg:p-8">
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Post a New Task</h2>
        <form onSubmit={addTask} className="space-y-4">
          <InputField icon={<Briefcase size={16} />} placeholder="Task Title (e.g., Furniture Assembly)" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          <InputField icon={<User size={16} />} placeholder="Your Name" value={taskPerson} onChange={(e) => setTaskPerson(e.target.value)} />

          <div className="relative">
            <InputField
              icon={<MapPin size={16} />}
              placeholder="Search Location..."
              // if the adder input is focused show the live query, otherwise show selected location label (or query)
              value={activeInput === "adder" ? queryAdder : (adderLocation?.display_name || queryAdder)}
              onChange={(e) => {
                setQueryAdder(e.target.value);
                setActiveInput("adder");
                setAdderLocation(null);
              }}
              onFocus={() => setActiveInput("adder")}
            />
            {activeInput === "adder" && suggestions.length > 0 && (
              <SuggestionsList suggestions={suggestions} onSelect={handleLocationSelect} />
            )}
          </div>

          <button type="submit" className={btnPrimary}>
            <PlusCircle size={16} /> Save Task
          </button>

          {adderStatus.message && (
            <p className={`text-sm text-center ${adderStatus.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {adderStatus.message}
            </p>
          )}
        </form>
      </div>

      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Find Tasks Near You</h2>
        <form onSubmit={searchTasks} className="space-y-4">
          <InputField icon={<Search size={16} />} placeholder="Search by Task Name..." value={searchTask} onChange={(e) => setSearchTask(e.target.value)} />

          <div className="relative">
            <InputField
              icon={<MapPin size={16} />}
              placeholder="Enter Your Location..."
              value={activeInput === "finder" ? queryFinder : (finderLocation?.display_name || queryFinder)}
              onChange={(e) => {
                setQueryFinder(e.target.value);
                setActiveInput("finder");
                setFinderLocation(null);
              }}
              onFocus={() => setActiveInput("finder")}
            />
            {activeInput === "finder" && suggestions.length > 0 && (
              <SuggestionsList suggestions={suggestions} onSelect={handleLocationSelect} />
            )}
          </div>

          <button type="submit" className={btnPrimary}>
            <Search size={16} /> {isSearching ? "Searching..." : "Search Tasks"}
          </button>
        </form>

        {/* Task Results */}
        <div className="mt-6">
          <h3 className="text-md font-semibold text-slate-700 mb-3">Results ({tasks.length})</h3>
          <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
            {isSearching && <p className="text-slate-500">Loading...</p>}
            {!isSearching && tasks.length > 0 && tasks.map((t) => (
              <div key={t._id} className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm">
                <p className="font-semibold text-slate-800">{t.title}</p>
                <p className="text-slate-600">Posted by {t.person}</p>
                <p className="text-slate-500 text-xs mt-1">
                  Distance: {t.distance < 1000 ? `${t.distance.toFixed(0)} meters away` : `${(t.distance / 1000).toFixed(1)} km away`}
                </p>
              </div>
            ))}
            {!isSearching && tasks.length === 0 && <p className="text-slate-500 text-sm">No tasks found for your search.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Reusable Sub-components ---

function InputField({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
      />
    </div>
  );
}

function SuggestionsList({ suggestions, onSelect }) {
  return (
    <ul className="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
      {suggestions.map((place) => (
        // use onMouseDown (and preventDefault) so selecting works even if input loses focus
        <li
          key={place.place_id}
          onMouseDown={(e) => {
            e.preventDefault();
            onSelect(place);
          }}
          className="px-4 py-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-100"
        >
          {place.display_name}
        </li>
      ))}
    </ul>
  );
}
