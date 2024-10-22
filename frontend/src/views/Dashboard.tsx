import {
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
    useMsal,
  } from '@azure/msal-react';
  import { useState } from 'react';
  import { Button } from 'react-bootstrap';
  
  interface IdTokenClaims {
    roles?: string[];
    // Add other properties if needed
  }
  
  export default function Dashboard() {
    const { instance } = useMsal();
    const [roles, setRoles] = useState<string[]>([]);
  
    const handleLogin = async () => {
      const token = await instance.acquireTokenPopup({
        scopes: ['user.read'],
      });
  
      const claims = token.idTokenClaims as IdTokenClaims;
      setRoles(claims.roles || []);
  
      console.log(token);
    };
  
    const handleLogout = async () => {
      await instance.logoutPopup();
    };
  
    return (
      <div>
        <UnauthenticatedTemplate>
          <div>
            <h1>Dashboard</h1>
            <h2>This is the Dashboard page</h2>
            <p>You are not logged into the system</p>
  
            <Button onClick={handleLogin} variant='primary' size='lg'>
              Login
            </Button>
          </div>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <div>
            <h1>Dashboard</h1>
            <h2>This is the Dashboard page</h2>
            <p>You are logged into the system</p>
  
            <div>Roles</div>
            <ul>
              {roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
  
            <Button onClick={handleLogout} variant='danger' size='lg'>
              Logout
            </Button>
          </div>
        </AuthenticatedTemplate>
      </div>
    );
  }