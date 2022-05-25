<template>
    <div class="mt-2 mb-6 text-sm text-red-600" v-if="errors !== ''">
        {{ errors }}
    </div>

    <form class="space-y-6" v-on:submit.prevent="saveCompany">
        <div class="space-y-4 rounded-md shadow-sm">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <div class="mt-1">
                    <input type="text" name="name" id="name"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="company.name">
                </div>
            </div>

            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-1">
                    <input type="text" name="email" id="email"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="company.email">
                </div>
            </div>

            <div>
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <div class="mt-1">
                    <input type="text" name="address" id="address"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="company.address">
                </div>
            </div>

            <div>
                <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
                <div class="mt-1">
                    <input type="text" name="website" id="website"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="company.website">
                </div>
            </div>
        </div>

        <button type="submit"
                class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">
            Save
        </button>
    </form>
</template>

<script>
import useCompanies from '../../composables/companies'
import { onMounted } from 'vue';

export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup(props) {
        const { errors, company, updateCompany, getCompany } = useCompanies()

        onMounted(() => getCompany(props.id))

        const saveCompany = async () => {
            await updateCompany(props.id)
        }

        return {
            errors,
            company,
            saveCompany
        }
    }
}
/*
* It is very similar to the Create form, but here are a few differences.

First, we accept the props and define that we expect id as required/string. Then, we use it inside of setup(props) and
* call the Composable methods with that exact parameter: getCompany(props.id) and updateCompany(props.id).
*

Next, in the create form we had a form variable that we defined as an object with keys and empty values. In this case,
* we actually have a variable company that is saved in the Composable file, so we don’t need to even pass it anywhere,
* we just get it from useCompanies() and use it as a local one. On the very event of mounted, we call getCompany() but
* we don’t need to assign the result to a variable, it’s all done in the composables/companies.js. Now, you see the
* beauty of Composition API?

The submit and validation parts work absolutely identical as the create form: redirects to the index in case of success,
* or show the error in case of the validation error.*/
</script>
