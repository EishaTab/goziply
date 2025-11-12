"use client";
import { useState, useEffect, useRef } from "react";
import { Search, Loader2, MapPin, Tag, Calendar, Briefcase, UserCircle, AlertTriangle, X as ClearIcon, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FindUser() {
    const [availableUsers, setAvailableUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchSkill, setSearchSkill] = useState("");

    // Location search states
    const [locationQuery, setLocationQuery] = useState("");
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [isSearchingLocation, setIsSearchingLocation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const debounceTimeout = useRef(null);

    /**
     * Fetches available users from backend - backend se hi sab kuch lega
     */
    const fetchAvailableUsers = async (skill = "", location = null) => {
        setIsLoading(true);
        setError(null);
        try {
            let url = `/api/dashboard/available?skill=${encodeURIComponent(skill)}`;
            if (location) {
                url += `&lat=${location.lat}&lng=${location.lng}`;
            }
            
            const res = await fetch(url);
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Could not fetch available users.");
            }
            
            const data = await res.json();
            
            // Backend se jo bhi data aaye, use as-it-is use karenge
            // Backend ko responsibility denge hourly rate calculate karne ki
            setAvailableUsers(data.users || []);
            
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch when component mounts
    useEffect(() => {
        fetchAvailableUsers();
    }, []);

    // Handler for main search
    const handleSearch = (e) => {
        e.preventDefault();
        fetchAvailableUsers(searchSkill, selectedLocation);
    };

    // Location search handlers (same as before)
    const handleLocationSearch = (e) => {
        const query = e.target.value;
        setLocationQuery(query);
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        if (query.length < 3) {
            setLocationSuggestions([]);
            return;
        }
        setIsSearchingLocation(true);
        debounceTimeout.current = setTimeout(async () => {
            try {
                const params = new URLSearchParams({ q: query, format: 'json', addressdetails: 1, limit: 5 });
                const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
                const data = await response.json();
                setLocationSuggestions(data || []);
            } catch (err) {
                console.error("Location search failed:", err);
            } finally {
                setIsSearchingLocation(false);
            }
        }, 500);
    };

    const handleLocationSelect = (suggestion) => {
        setSelectedLocation({ lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) });
        setLocationQuery(suggestion.display_name);
        setLocationSuggestions([]);
    };

    const clearLocation = () => {
        setSelectedLocation(null);
        setLocationQuery("");
        fetchAvailableUsers(searchSkill, null);
    };

    return (
        <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Find a Tasker</h1>
                    <p className="text-slate-500 mt-1">Search for skilled individuals available to work today near you.</p>
                    
                    <form onSubmit={handleSearch} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={locationQuery}
                                onChange={handleLocationSearch}
                                placeholder="Enter a city or address..."
                                className="w-full p-3 pl-10 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
                            />
                            {isSearchingLocation && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 animate-spin" size={18} />}
                            {selectedLocation && !isSearchingLocation && <button type="button" onClick={clearLocation} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><ClearIcon size={18} /></button>}
                            
                            <AnimatePresence>
                                {locationSuggestions.length > 0 && (
                                    <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute z-10 w-full border border-slate-200 rounded-md bg-white shadow-lg mt-1 max-h-48 overflow-y-auto">
                                        {locationSuggestions.map((s) => (
                                            <li key={s.place_id} onClick={() => handleLocationSelect(s)} className="p-3 text-sm text-slate-700 cursor-pointer hover:bg-slate-50">
                                                {s.display_name}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        <div className="flex gap-2">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={searchSkill}
                                    onChange={(e) => setSearchSkill(e.target.value)}
                                    placeholder="Filter by skill..."
                                    className="w-full p-3 pl-10 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
                                />
                            </div>
                            <button type="submit" disabled={isLoading} className="flex items-center justify-center gap-2 px-6 py-2 rounded-md transition duration-200 text-sm font-semibold bg-slate-800 text-white hover:bg-slate-900 disabled:bg-slate-400">
                                {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Search"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-4">
                    {isLoading ? ( 
                        <div className="text-center p-8">
                            <Loader2 className="mx-auto animate-spin text-slate-500" size={32} />
                        </div> 
                    ) : error ? ( 
                        <div className="text-center py-12 text-red-600">
                            <AlertTriangle className="mx-auto mb-2"/>
                            {error}
                        </div> 
                    ) : availableUsers.length > 0 ? ( 
                        availableUsers.map(profile => (
                            <UserCard key={profile._id} profile={profile} />
                        ))
                    ) : ( 
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
                            <UserCircle className="mx-auto text-slate-400" size={48} />
                            <h3 className="mt-4 text-lg font-semibold text-slate-700">No Taskers Found</h3>
                            <p className="mt-1 text-sm text-slate-500">No one matched your criteria. Try a different search.</p>
                        </div> 
                    )}
                </div>
            </div>
        </div>
    );
}

function UserCard({ profile }) {
    const user = profile?.user || {};
    const firstName = user.firstName || "Unnamed";
    const lastNameInitial = user.lastName ? user.lastName.charAt(0) : '';
    const firstNameInitial = firstName ? firstName.charAt(0) : '?';
    const profileImage = user.profileImage || `https://placehold.co/96x96/E2E8F0/475569?text=${firstNameInitial}`;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col sm:flex-row gap-5 transition-shadow hover:shadow-md"
        >
            <div className="flex-shrink-0 text-center sm:w-28">
                <img 
                    src={profileImage} 
                    alt={`${firstName}'s profile`} 
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-slate-100" 
                />
                <h3 className="mt-2 text-lg font-bold text-slate-800">
                    {firstName} {lastNameInitial}.
                </h3>
                
                {/* Hourly Rate - Backend se hi aayega */}
                {profile.hourlyRate > 0 && (
                    <div className="mt-2 flex items-center justify-center gap-1 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                        <DollarSign size={14} className="text-green-600" />
                        <span className="text-sm font-bold text-green-700">
                            ${profile.hourlyRate}/hr
                        </span>
                    </div>
                )}
                
                {profile.distanceInKm && (
                    <p className="text-sm font-semibold text-green-600 mt-1">
                        ~ {profile.distanceInKm} km away
                    </p>
                )}
            </div>
            
            <div className="border-t sm:border-t-0 sm:border-l border-slate-200 w-full pl-0 sm:pl-5 pt-4 sm:pt-0">
                <span className="flex items-center gap-1 text-sm font-bold bg-slate-800 text-white px-3 py-1 rounded-full w-fit">
                    <Tag size={12}/> {profile.skill || "Not specified"}
                </span>
                
                <p className="text-sm text-slate-600 mt-3 flex items-start gap-2">
                    <MapPin size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>{profile.fullAddress || "Location not specified"}</span>
                </p>
                
                {/* Bio - Backend se hi aayegi */}
                {user.bio && (
                    <p className="text-sm text-slate-500 mt-3 italic">"{user.bio}"</p>
                )}
                
                {/* User Skills - Backend se hi aayenge */}
                {user.skills && user.skills.length > 0 && (
                    <div className="mt-3">
                        <p className="text-xs font-semibold text-slate-500 mb-1">SKILLS:</p>
                        <div className="flex flex-wrap gap-1">
                            {user.skills.map((skill, index) => (
                                <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                    {(profile.workScope?.length > 0) && (
                        <p className="flex items-center gap-2">
                            <Briefcase size={14} className="text-slate-400"/>
                            <strong>Scope:</strong> {profile.workScope.join(', ')}
                        </p>
                    )}
                    
                    {(profile.workDays?.length > 0) && (
                        <p className="flex items-center gap-2">
                            <Calendar size={14} className="text-slate-400"/>
                            <strong>Available:</strong> {profile.workDays.join(', ')}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}