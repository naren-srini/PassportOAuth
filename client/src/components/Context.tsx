import React , {createContext, useEffect, useState} from 'react'
import axios, { AxiosResponse } from 'axios';

export const myContext = createContext({});
export default function Context(props: any) {

    // Creating a state to store user data that we get from the API
    const [userObject, setUserObject] = useState<any>();
    
    // Passing the state and setting the user object 
    useEffect(() => {
        axios.get("http://localhost:4000/getuser", {withCredentials: true}).then((res: AxiosResponse) => {
            if (res.data) {
                // console.log(res);
                setUserObject(res.data); 
            } 
        })
    }, [])
    
    return (
      <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}
 