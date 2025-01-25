import "./AbsentsFilter.css";
import React from 'react';
interface IProps {
    filterAbsentsMax: (e: React.ChangeEvent<HTMLInputElement>) => void;
    params: URLSearchParams;
}
const AbsentsMax = (props: IProps) => {
    return (
        <div className="max">
        <label htmlFor="max">To: <span>{Number(props.params.get('maxAbs')) || 0}</span></label>
        <input 
        value={Number(props.params.get('maxAbs')) || 0}
        type="range"  
        id="max" 
        min={0} 
        max={25} 
        step={1} 
        onChange={props.filterAbsentsMax} 
        />
        </div>
    )
}

export default AbsentsMax;