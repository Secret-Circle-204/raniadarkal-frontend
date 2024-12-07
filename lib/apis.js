// lib/apis.js
// get data from directus
import { readItems, readItem } from '@directus/sdk';
import directus from '@/lib/directus';
export const revalidate = 60;



export const getHomeData = async () => {

  try {
    const response = await directus.request(readItems('home_page', {
      next: {
        revalidate: 60
      },
      // filter: {
      //   slug: { _eq: slug }
      // },
      fields: [
        '*',
        'id',
        'content',
        'images.*',
        // 'images.*.*',
        'title',
        'subtitle',
        'tagline',
        'headline',
        'points.*.*'
        //   'id',
        //   'blocks',
        //   'blocks.*.*',
        //   'item',
        //   'item.*.*'
      ],
    }));
    return response;
  } catch (error) {
    console.error('Error fetching trip data:', error);
    return null;
  }
}


export const getTeamPageData = async () => {
  try {
    const response = await directus.request(
      readItems('team_page', {
        next: {
          revalidate: 60
        },
        fields: ['id', 'title', 'main_image', 'description']
      }));
    return response
  } catch (error) {
    console.error('Error fetching trip data:', error);
    return null;
  }
}
export const getTeamData = async () => {
  try {
    const response = await directus.request(
      readItems('team', {
        fields: ['id', 'name', 'job_title', 'image', 'description']
      })
    )
    return response
  } catch (error) {
    console.error('Error fetching trip data:', error);
    return null;
  }
}

export const getLocations = async () => {
  try {
    return await directus.request(readItems('locations', {
      fields: ['id', 'lat', 'lng', 'is_active', 'images.*', { language_options: ['title', 'description', 'languages_code'] }],
    }));
  } catch (error) {
    console.error('Error fetching locations data:', error);
    return null;
  }
};

export const getProjectDetails = async (id) => {
  try {
    const response = await directus.request(readItem('projects_details', id, {
      next: {
        revalidate: 20
      },

      fields: [
        '*',
        'id',
        'main_image',
        'title',
        'date_created',
        'desc',
        'summary',
        'client_name',
        'gallery.*',
        'Duration',
        'Budget',
        'project_date',
      ],
      // sort: ['start_date' ?? 'sort'],

    }));
    return response
  } catch (error) {
    console.error(error);
    return null;
  }
}


export const getProjects = async () => {
  try {
    const response = await directus.request(
      readItems('project', {

        next: { revalidate: 7 },

        fields: [
          '*',
          'id',
          'title',
          'sort',
          'main_image',
          'status',
          'related_client.*',
          'project_date',
        ],
        sort: ['sort'],

      }));
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des horaires:', error);
    return null;
  }
};
export const getProject = async (id) => {
  try {
    const response = await directus.request(
      readItem('project', id, {

        next: { revalidate: 7 },
        filter: {
          id: { _eq: id }
        },
        fields: [
          'id',
          'title',
          'sort',
          'main_image',
          'status',
          'related_client',
          'related_client.*.*',
          'project_date',
          'sort'

        ],

        sort: ['sort']


      }));
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des horaires:', error);
    return null;
  }
};













