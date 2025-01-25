import { useEffect, useState } from "react";
import { IStudent } from "../types";

const useFilter = (studentsList: IStudent[], params: URLSearchParams) => {
    const [filteredList, setFilteredList] = useState<IStudent[]>(studentsList);

    useEffect(() => {
        const query = params.get('q') || '';
        const graduated = params.get('graduated');
        const courses = params.getAll('courses');
        const min = params.get('minAbs');
        const max = params.get('maxAbs');
        if (query) {
            setFilteredList(studentsList.filter(std => std.name.toLowerCase().includes(query.toLowerCase())));
        } else {
            setFilteredList(studentsList);
        }
    
        if (graduated === 'grad') {
            setFilteredList(oldState => (oldState.filter(std => std.isGraduated)));
        } else if (graduated === 'non-grad') {
            setFilteredList(oldState => (oldState.filter(std => std.isGraduated == false)));
        }
    
        if (courses.length > 0) {
            setFilteredList(oldState => (oldState.filter(std => courses.every(c => (std.coursesList.includes(c))))));
        }

        if(min !== null) {
            if(max) {
                setFilteredList(old => old.filter(std => (std.absents >= Number(min) && std.absents <= Number(max))));
            }
            else {
                setFilteredList(old => old.filter(std => (std.absents >= Number(min))));
            }
        }
        if(max !== null) {
            if(min) {
                setFilteredList(old => old.filter(std => (std.absents >= Number(min) && std.absents <= Number(max))));
            }
            else {
                setFilteredList(old => old.filter(std => (std.absents <= Number(max))));
            }
        }
    }, [params, studentsList]);
    return{filteredList};
}

export default useFilter;