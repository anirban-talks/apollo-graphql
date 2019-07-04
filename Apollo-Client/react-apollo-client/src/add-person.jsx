import React,{Component} from 'react';
import {Mutation} from 'react-apollo';
import { gql } from "apollo-boost";

const ADD_PERSON_GQL = gql`
    mutation addPerson($name: String!, $age: Int!, $sex: String!){
        addPerson(name: $name, age: $age, sex: $sex) @client
    }
`;

export default class AddPerson extends Component{
    state = {
        show: false,
        formData: this.defaultFormData
    }
    get defaultFormData(){
        return {
            name:"",
            age:"",
            sex:""
        };
    }
    toggleAddPerson(){
        const {show} = this.state;
        this.setState({
            show: !show,
            formData: this.defaultFormData
        })
    }
    onFormInputChange(type,e){
        const {formData} = this.state;
        this.setState({
            formData:{
                ...formData,
                [type]: e.target.value
            }
        })
    }
    render(){
        const {show} = this.state;
        return (
            <div className="add-person">
                <input type="button" value={show?"X":"Add Person"} onClick={()=>this.toggleAddPerson()}/>
                <br/>
                {show && 
                <Mutation mutation={ADD_PERSON_GQL}>
                {
                    (addPerson,{data})=>{
                        const onSubmit = (e)=>{
                            const {formData} = this.state;
                            addPerson({variables:formData});
                            this.toggleAddPerson();
                            e.preventDefault();
                        };
                        return <form onSubmit={onSubmit} action="#">
                            <div>
                                <input type="text" name="name" placeholder="Name" required
                                    onChange={(e)=>this.onFormInputChange("name",e)}/>
                            </div>
                            <div>
                                <input type="number" min="10" max="100" name="age" placeholder="Age" required
                                    onChange={(e)=>this.onFormInputChange("age",e)}/>
                            </div>
                            <div>
                                <select type="text" name="sex" required
                                    onChange={(e)=>this.onFormInputChange("sex",e)}>
                                    <option value="">Select Sex</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>
                            <div>
                                <input type="submit" value="Submit New Person"/>
                            </div>
                        </form>;
                    }
                }
                </Mutation>
                }
            </div>
        )
    }
}