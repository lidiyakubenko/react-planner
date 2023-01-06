import axios, {AxiosResponse} from "axios";

export const fetchRandomDogImage = async () => {
  const result: AxiosResponse<{ message: string }> = await axios.get('https://dog.ceo/api/breeds/image/random')
  return result.data.message
}

export const fetchRandomCatFact = async () => {
  const result: AxiosResponse<{ fact: string }> = await axios.get('https://catfact.ninja/fact')
  return result.data.fact
}

export const fetchRandomActivity = async () => {
  const result: AxiosResponse<{ activity: string }> = await axios.get('https://www.boredapi.com/api/activity')
  return result.data.activity
}
