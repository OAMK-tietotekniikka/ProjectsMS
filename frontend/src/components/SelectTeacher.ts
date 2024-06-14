import axios from "axios"
import { useEffect, useState } from "react"

export const selectTeacher = (company: String, startDate: String) => {
    const [teachers, setTeachers] = useState([])
    const [resources, setResources] = useState([])
    const [companies, setCompanies] = useState([])
    const [selectedTeacher, setSelectedTeacher] = useState('')

    
    useEffect (() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/teachers')
                setTeachers(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTeachers()
    }, [])

    useEffect (() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('http://localhost:5000/resources')
                setTeachers(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchResources()
    }, [])

    useEffect (() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/companies')
                setTeachers(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompanies()
    }, [])
    


}