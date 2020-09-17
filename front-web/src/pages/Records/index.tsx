import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Filter from '../../components/Filter';
import { formatDate } from '../../helpers/formatDate';
import Pagination from './Pagination';
import './style.css';
import { RecordResponse } from './types';

export const BASE_URL = "http://localhost:8085/";

const Records = ()=>{
    const [recordsResponse, setRecordsResponse] = useState<RecordResponse>();
    const [activePage, setActivePage] = useState(0);
    const handlePageChange = (index:number)=>{
        setActivePage(index);
    }
    useEffect(()=>{
        Axios.get<RecordResponse>(`${BASE_URL}records?linesPerPage=12&page=${activePage}`)
        .then(response=> setRecordsResponse(response.data));
    },[activePage]);
    return(
    <div className="page-container">
        <Filter link="/charts" linkText="See Graphics"/>
        <table className="records-table" cellPadding="0" cellSpacing="0">
            <thead>
                <tr>
                    <th>INSTANT</th>
                    <th>NAME</th>
                    <th>AGE</th>
                    <th>PLATFORM</th>
                    <th>GENDER</th>
                    <th>GAME TITLE</th>
                </tr>
            </thead>
            <tbody>
                {recordsResponse?.content.map(record=>(
                    <tr key={record.id}>
                        <td>{formatDate(record.moment)}</td>
                        <td>{record.name}</td>
                        <td>{record.age}</td>
                        <td className="text-secondary">{record.gamePlatform}</td>
                        <td>{record.genreName}</td>
                        <td className="text-primary">{record.gameTitle}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Pagination 
            activePage={activePage}
            totalPages={recordsResponse?.totalPages}
            goToPage={handlePageChange}
        />
    </div>
    );
};

export default Records;