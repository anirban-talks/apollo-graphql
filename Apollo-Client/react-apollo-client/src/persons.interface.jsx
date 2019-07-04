import React from 'react';
import {Query} from 'react-apollo';
import { gql } from "apollo-boost";
const PERSONS_QUERY = gql`
    query{
        getPersons{
            name
            age
            sex
            ... on Employee{
                empId
                role
            }
            ... on User{
                userId
                address
            }
            __typename
        }
    }
`;
const Employee = ({name,age,sex,empId,role}) =>
    <>
        <div>Name: {name}</div>
        <div>Age: {age}</div>
        <div>Sex: {sex}</div>
        <div>Employee ID: {empId}</div>
        <div>Role: {role}</div>
    </>
;
const User = ({name,age,sex,userId,address}) =>
    <>
        <div>Name: {name}</div>
        <div>Age: {age}</div>
        <div>Sex: {sex}</div>
        <div>User ID: {userId}</div>
        <div>Address: {address}</div>
    </>
;
const decidePerson = ({__typename, ...personObj}) => {
    switch(__typename){
        case "Employee":
            return Employee(personObj);
        case "User":
            return User(personObj);
        default: return null;
    }
}
const PersonsInterface = () =>
    <Query query={PERSONS_QUERY}>
    {
        ({data, loading, error})=>{
        if(loading) return <div className="loading">Loading...</div>
        if(error) return <div className="error">Error Occurred {error.graphQLErrors}</div>
        return <div>
            <h2>Employee / User List:</h2>
            <ul className="person-list">
            {
                !!data && data.getPersons.map((person,index)=>
                <li className="person-list-item" key={index}>
                    {decidePerson(person)}
                </li>)
            }
            </ul>
        </div>
        }
    }
    </Query>;

export default PersonsInterface;