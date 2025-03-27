import api from '../api'

export const fetchData = async (endpoint, setData, setLoading) => {
    setLoading(true)
    try {
        const response = await api.get(endpoint)
        setData(response.data)
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error)
    } finally {
        setLoading(false)
    }
}
