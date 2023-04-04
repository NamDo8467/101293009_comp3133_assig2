import { gql } from 'apollo-angular';

const ALL_EMPLOYEES_QUERY = gql`
  query {
    getAllEmployees {
      id
      first_name
      last_name
      gender
      salary
      email
    }
  }
`;

// const GET_EMPLOYEES_BY_ID = gql`
//   query{
//     getEmployeeById(id:"63f023efb9d94a04e2dc8207"){
//       id, first_name, last_name, gender, email, salary
//     }
//   }
// `
export { ALL_EMPLOYEES_QUERY };
