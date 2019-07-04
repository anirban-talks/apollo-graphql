import React from 'react';
import {Query} from 'react-apollo';
import { gql } from "apollo-boost";
import AddPerson from './add-person';

export const PERSONS_QUERY = gql`
  query{
    getPersons{
      name
      age
      sex
    }
  }
`;
const persons = () =>
    <Query query={PERSONS_QUERY}>
    {
        ({data, loading, error})=>{
        if(loading) return <div className="loading">Loading...</div>
        if(error) return <div className="error">Error Occurred {error.graphQLErrors}</div>
        return <div>
            <AddPerson/>
            <h2>Person's List:</h2>
            <ol className="person-list">
            {data.getPersons.map(({name,age,sex},index)=>{
            return <li className="person-list-item" key={index}>
                <div>Name: {name}</div>
                <div>Age: {age}</div>
                <div>Sex: {sex}</div>
            </li>
            })}
            </ol>
        </div>
        }
    }
    </Query>;

export default persons;