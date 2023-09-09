import Layout from '../../components/layout';
import { useState, useRef, useEffect } from 'react';
import { getDatabase, ref, get, child } from 'firebase/database'
import firebaseApp from '../../services/firebase-sdk';
import Router from "next/router"

export default function inputBeratBeras() {

    const [isLoading, setIsLoading] = useState(true);
    const [refreshToken, setRefreshToken] = useState(Math.random());
    const snapshot = useRef(null);
    const error = useRef(null);


    const getValue = async () => {

        try {
            console.log(process.env.NEXT_PUBLIC_DATABASE_URL);
            const database = getDatabase(firebaseApp);
            const rootReference = ref(database);
            const dbGet = await get(child(rootReference, 'timbangan1'));
            const dbValue = dbGet.val();
            snapshot.current = dbValue;
        } catch (getError) {
            error.current = getError.message
        }
        setIsLoading(false);


    }

    useEffect(() => {
        getValue();
        setTimeout(() => setRefreshToken(Math.random()), 3000);
    }, [refreshToken])

    if (isLoading) {
        return (
            <p>Fetching Data...</p>
        )
    }

    const beratBerasInput = snapshot.current;
    

    async function onClickHandle () {
        Router.push({
            pathname: "/DataProduksiBeras/addDataProduksiBeras" ,
            query: {beratBerasInput}
        }, "/DataProduksiBeras/addDataProduksiBeras")
    }

    return (
        <Layout>
            <p>Membaca input beras disini

            </p>
            <div>
                <h2>{beratBerasInput}</h2>
            </div>

            <a onClick={onClickHandle}><button style={{}} type="button">Submit</button></a>
        </Layout>
    );
}