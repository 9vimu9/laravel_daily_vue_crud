import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useCompanies() {
    const company = ref([])
    const companies = ref([])

    const errors = ref('')
    const router = useRouter()

    const getCompanies = async () => {
        let response = await axios.get('/api/companies')
        companies.value = response.data.data
    }

    const getCompany = async (id) => {
        let response = await axios.get(`/api/companies/${id}`)
        company.value = response.data.data
    }

    const storeCompany = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/companies', data)
            await router.push({ name: 'companies.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }

    }

    const updateCompany = async (id) => {
        errors.value = ''
        try {
            await axios.patch(`/api/companies/${id}`, company.value)
            await router.push({ name: 'companies.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const destroyCompany = async (id) => {
        await axios.delete(`/api/companies/${id}`)
    }


    return {
        errors,
        company,
        companies,
        getCompany,
        getCompanies,
        storeCompany,
        updateCompany,
        destroyCompany
    }
}
/*
* A few things to note here.

The usual standard name of the function of Composable is useSomething(), and it doesn’t necessarily need to be the same as the filename.

Next, we use axios for the API requests, which is by default included in Laravel installation, we just need to import it and can make the requests like axios.get() and axios.post().

Next, what is that ref thing? It is shorter for “reference”, and as it is said in the official Vue 3 documentation, “In Vue 3.0 we can make any variable reactive anywhere with a new ref function”. So, when we define our variables with, for example, const companies = ref([]) syntax, now whenever we call getCompanies, companies will be mutated and the view will be updated to reflect the change.

The next thing to notice is that we use Vue Router to redirect to the list, by its name companies.index, after a successful store/update method. In case of validation errors with code 422, we parse the error structure and turn it into a String variable of errors.

Finally, we define what we return from the Composable file – all variables and methods.
* */
