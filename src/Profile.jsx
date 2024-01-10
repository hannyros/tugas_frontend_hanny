import { useEffect, useState } from "react"

const Profile = () => {
    const [profileData, setProfileData] = useState(null) 

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                const result = await response.json();
                setProfileData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getProfile()
    }, [])
    return <div style={{textAlign: "left"}}>
        <a href ="/">Home</a>
        {profileData && 
        <table>
            {profileData.map((raw) => (
            <div>
                <tbody>
                    <tr>
                        <th>Nama</th>
                        <th style={{width: '20px'}}>:</th>
                        <td>{raw.name}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <th style={{width: '20px'}}>:</th>
                        <td>{raw.email}</td>
                    </tr>
                    <tr>
                        <th>Alamat</th>
                        <th style={{width: '20px'}}>:</th>
                        <td>{`${raw.address.street}, ${raw.address.suite} ${raw.address.city} - ${raw.address.zipcode}`}</td>
                    </tr>
                    <tr>
                        <th>No. Telefon</th>
                        <th style={{width: '20px'}}>:</th>
                        <td>{raw.phone}</td>
                    </tr>
                    <tr>
                        <th>Perusahaan</th>
                        <th style={{width: '20px'}}>:</th>
                        <td>{`${raw.email}`}</td>
                    </tr>
                </tbody>
                <hr />
            </div>
            ))}
            
        </table>}
    </div>
}

export default Profile