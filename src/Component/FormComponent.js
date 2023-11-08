import React from 'react'
import { useState, useEffect } from 'react'

import { Table, Button } from 'react-bootstrap';
import '../Component/FormCompoenet.css';

function FormComponent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(null);

    const [data, setData] = useState([]);


    //update
    const [update, setUpdate] = useState(false);
    const [dataId, setDataId] = useState(null);



    const url = "http://localhost:3000/posts";


    const getData = async () => {



        let result = await fetch(url);
        result = await result.json();
        console.log(result);
        if (result) {
            setData(result)
        }

        // fetch(url).then((result) => {
        //     result.json().then((resp) => {
        //         console.log(resp);
        //         setData(resp);
        //     })
        // })




    }




    const postData = async (e) => {
        e.preventDefault();


        const data = { name, email, phone }
        let result = await fetch(url, {
            method: 'post',
            headers: {
                "Active": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        result = result.json();
        if (result) {

            alert("Post Data Successfully !!!")
            setName('');
            setEmail('');
            setPhone('');
            getData();
        }
    }

    const DeleteData =async(data)=> {

        // if(confirm("Press Ok button for delete !!! "===true){ }
        let result = await fetch(`${url}/${data}`, {
            method: 'delete',

        })
        result = await result.json();
        if (result) {
            alert("Data Delete Successfully !!!")
            getData();
        }

    }

    const edit = (data) => {
        setUpdate(true);
        setDataId(data.id);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);


    }
    const updateData = async (e) => {
        const data = { name, email, phone }
        e.preventDefault();
        let result = await fetch(`${url}/${dataId}`, {
            method: 'Put',
            headers: {
                "Active": "application/json",
                "Content-type": "application/json"

            },
            body: JSON.stringify(data)
        })
        result = result.json();
        if (result) {
            alert("data update Successfully !!!");

            setUpdate(false);
            setName('');
            setEmail('');
            setPhone('');
            getData();
            getData();
        }
    }

    const closed=()=>{
        setUpdate(false);
        setName('');
        setEmail('');
        setPhone('');

    }

    useEffect(() => {
        getData();
    }, [])



    return (
        <div className='App'>
            <h1>FormComponent</h1>
            {
                update ?
                    <div className='Box1'>
                        <h3  >Update Data</h3>
                     
                       <form >
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='enter your name' /><br /><br />
                            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' /><br /><br />
                            <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='enter your phone' /><br /><br />
                          
                            <Button variant="danger" className="button" onClick={() =>{closed()}}>Close</Button>
                            <Button variant="primary" onClick={(e) => updateData(e)} >Update</Button>
                        </form>
                        
                    </div>
                    :

                    <div className='Box1'>
                        <h3>Form Data</h3>

                        <form >
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='enter your name' /><br /><br />
                            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' /><br /><br />
                            <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='enter your phone' /><br /><br />
                            <Button variant="success" onClick={(e) => postData(e)}>Submit</Button>
                        </form>
                    </div>
            }
            
             <h1>Table Form Data</h1>
            {
                data.length ?
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>

                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td><Button variant="danger" onClick={() => DeleteData(item.id)}>Delete</Button></td>
                                        <td><Button variant="primary" onClick={() => edit(item)}>Edit</Button></td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>

                    : null
            }
            </div>
    )
}

export default FormComponent