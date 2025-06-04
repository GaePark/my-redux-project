import React, {JSX, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'react-router';
import { setSeoulDetail, clearSeoulDetail } from '../../reducers/seoulSlice';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import { fromLonLat } from 'ol/proj';

const Detail = ():JSX.Element => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const { no } = useParams();
    const dispatch = useDispatch();
    const seoul = useSelector((state: RootState) => state.seoul.seoulDetail);
    const [isLoaded, setIsLoaded] = useState(false);

    const param = {
        name: '범죄주의구간(폭력)',
        serverUrl: 'https://www.safemap.go.kr/openApiService/wms/getLayerData.do?apikey=HYZ02T41-HYZ0-HYZ0-HYZ0-HYZ02T41YS',
        layername: 'A2SM_CRMNLHSPOT_TOT',
        styles: 'A2SM_CrmnlHspot_Tot_Violn'
    };

    useEffect(() => {
        dispatch(clearSeoulDetail()); // 초기화 먼저
        const fetchSeoulDetail = async (): Promise<void> => {
            try {
                const res = await axios.get(`http://localhost/seoul/detail/${Number(no)}`);
                dispatch(setSeoulDetail(res.data));
                setIsLoaded(true);
            } catch (e) {
                console.error(e);
            }
        };

        fetchSeoulDetail();
    }, [no, dispatch]);

    useEffect(() => {
        if (!seoul?.address || !isLoaded) return;

        // 지도 DOM 초기화
        if (mapRef.current) {
            mapRef.current.innerHTML = '';
        }

        const geocodeAndInitMap = async () => {
            try {
                const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: {
                        q: seoul.address,
                        format: 'json'
                    }
                });

                if (data.length === 0) return;

                const { lat, lon } = data[0];
                const center = fromLonLat([parseFloat(lon), parseFloat(lat)]);

                // 이전 지도 제거
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.setTarget(undefined);
                    mapInstanceRef.current = null;
                }

                const map = new Map({
                    target: mapRef.current as HTMLElement,
                    layers: [
                        new TileLayer({ source: new OSM() }),
                        new TileLayer({
                            source: new TileWMS({
                                url: param.serverUrl,
                                params: {
                                    LAYERS: param.layername,
                                    STYLES: param.styles,
                                    FORMAT: 'image/png',
                                    TRANSPARENT: true
                                },
                                serverType: 'geoserver',
                                crossOrigin: 'anonymous'
                            }),
                            opacity: 0.6
                        })
                    ],
                    view: new View({
                        center,
                        zoom: 18
                    })
                });

                mapInstanceRef.current = map;
            } catch (error) {
                console.error("Geocoding failed:", error);
            }
        };

        geocodeAndInitMap();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.setTarget(undefined);
                mapInstanceRef.current = null;
            }
        };
    }, [seoul?.address, isLoaded]);

    return (
        <div className="container mt-4" style={{ maxWidth: '960px' }}>
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped text-center">
                        <tbody>
                        <tr>
                            <td>
                                <img
                                    src={seoul?.poster || ''}
                                    alt=""
                                    style={{ width: '100%', height: '400px' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><h3>{seoul?.title}</h3></td>
                        </tr>
                        <tr><th>소개</th></tr>
                        <tr><td>{seoul?.msg}</td></tr>
                        <tr><th>주소</th></tr>
                        <tr><td>{seoul?.address}</td></tr>
                        </tbody>
                    </table>
                    <div ref={mapRef} id="map" className="mb-4" style={{ width: '100%', height: '600px' }} />
                </div>
            </div>
        </div>
    );
};

export default Detail;
