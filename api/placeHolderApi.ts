import axios from 'axios';
import IPost from './interfaces/IPost';

const API_BASE_HOLDER = 'https://jsonplaceholder.typicode.com';

export const getPosts = async (page:number):Promise<IPost[]> => {

  try {
    const response = await axios.get<IPost[]>(`${API_BASE_HOLDER}/posts?_limit=10&_page=${page}`);
    return response.data;
    //const posts: IPost[] = response.data;
    //return posts;
  } catch (error) {
    console.error('Error al traer los posts', error);
    throw error;
  }
}

//* https://jsonplaceholder.typicode.com/posts?_limit=10?_page=1