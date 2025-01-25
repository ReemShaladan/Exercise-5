import "./AbsentsFilter.css";
import React from 'react'
interface IProps {
    filterAbsentsMin: (e: React.ChangeEvent<HTMLInputElement>) => void;
    params: URLSearchParams

}
const AbsentsMin = (props:  IProps) => {
    return (
        <div className="min">
        <label htmlFor="min">From: <span>{Number(props.params.get('minAbs')) || 0}</span></label>
        <input
        value={Number(props.params.get('minAbs')) || 0}
        type="range"
        name=""
        id="min"
        min={0} 
        max={20} 
        step={1} 
        onChange={props.filterAbsentsMin} 
        />
    </div>
    )
}

export default AbsentsMin;