export const authRole = {
  admin: 'admin',
  superadmin: 'superadmin',
  karyawan: 'karyawan',
  all: ['admin', 'superadmin', 'karyawan']
};

export const defaultUser = {
  displayName: 'John Alex',
  email: 'demo@example.com',
  token: 'access-token',
  role: 'admin',
  photoURL: 'https://via.placeholder.com/150',
};
export const initialUrl = '/home'; // this url will open after login
