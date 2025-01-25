import { useEffect, useRef, useState } from "react";
import Student from "../components/student/student.component";
import { IStudent } from "../types";

import { useSearchParams } from "react-router-dom";
import React from "react";
import useFilter from "../hooks/useFilter.hooks";
import AbsentsMin from "../components/absentsFilter/AbsentsMin.comp";
import AbsentsMax from "../components/absentsFilter/AbsentsMax.comp";

interface IProps {
  totalAbsents: number,
  studentsList: IStudent[],
  onAbsent: (id: string, change: number) => void,
  onRemove: () => void,
}

const COURSES_FILTERS = ['Math', 'HTML', 'CSS', 'OOP'];

const Main = (props: IProps) => {
  const { totalAbsents, studentsList } = props;
  const [params, setParams] = useSearchParams();
  const lastStdRef = useRef<HTMLDivElement>(null);
  const {filteredList} = useFilter(props.studentsList, params);

  const scrollToLast = () => {
    if (lastStdRef.current) {
      lastStdRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    setParams(params);
  }

  const handleGardFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const v = event.target.value;
    if (v === 'all') {
      params.delete('graduated');
    } else {
      params.set('graduated', v);
    }
    setParams(params);
  }

  const handleCourseFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      params.append('courses', course);
    } else {
      params.delete('courses', course);
    }
    setParams(params);
  }

  const filterAbsentsMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = e.target.value;
    if(Number(min) == 0) {
        params.delete("minAbs");
    }
    else {
        params.set('minAbs', min);
    }
    setParams(params);
  }

  const filterAbsentsMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = e.target.value;
    if(Number(max) == 0) {
      params.delete("maxAbs");
  }
  else {
      params.set('maxAbs', max);
  }
  setParams(params);
  }

  if (props.studentsList.length === 0) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="main-screen">
      <h2>Students List</h2>
      <div className="stats">
        <button onClick={props.onRemove}>POP Student</button>
        <button onClick={scrollToLast}>Scroll to Last</button>
        <b style={{ fontSize: '12px', fontWeight: 100, color: 'gray' }}>Total Absents {totalAbsents}</b>
      </div>
      <div className="filter">
        <input type="search" placeholder="Search" onChange={handleSearch} value={params.get('q') || ''} />
        <select value={params.get('graduated') || 'all'} onChange={handleGardFilter}>
          <option value="all">All</option>
          <option value="grad">Graduated</option>
          <option value="non-grad">Not Graduated</option>
        </select>
        <div>
          {
            COURSES_FILTERS.map(c => (
              <React.Fragment key={c}>
                <input
                  id={c}
                  type="checkbox"
                  value={c}
                  onChange={handleCourseFilter}
                  checked={params.getAll('courses').includes(c)}
                />
                <label htmlFor={c}>{c}</label>&nbsp;&nbsp;
              </React.Fragment>
            ))
          }
        </div>
        <h3 className="absents">Absents:</h3>
        <div className="abs-range">
          <div className="selection">
              <AbsentsMin params={params} filterAbsentsMin={filterAbsentsMin}/>
              <AbsentsMax params={params} filterAbsentsMax={filterAbsentsMax}/>
          </div>
        </div>
      </div>
      {
        filteredList.length
          ? (
            <div className="list">
              {
                filteredList.map(student => (
                  <Student
                    key={student.id}
                    id={student.id}
                    name={student.name}
                    age={student.age}
                    absents={student.absents}
                    isGraduated={student.isGraduated}
                    coursesList={student.coursesList}
                    onAbsentChange={props.onAbsent}
                    mode="list"
                  />
                ))
              }
            </div>
          )
          : <h3>No results found!</h3>
      }
      <div ref={lastStdRef}></div>
    </div>
  )
}

export default Main;