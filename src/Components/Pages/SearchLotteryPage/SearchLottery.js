import React, { useEffect, useState } from 'react';
import Search from '../../Search/Search';
import "./searchLottery.css";
import { Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getLotteryRange } from '../../../Utils/getInitialState';
import { LotteryRange } from '../../../Utils/apiService';
import { generateGroups, generateNumbers, generateSeries } from '../../../Utils/helper';
import { useAppContext } from '../../../contextApi/context';

const SearchLottery = () => {
    const [lotteryRange, setLotteryRange] = useState(getLotteryRange);
    const [allActiveMarket, SetAllActiveMarket] = useState([]);
    const [filteredMarket, setFilteredMarket] = useState(null);
    const [filteredNumbers, setFilteredNumbers] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [filteredSeries, setFilteredSeries] = useState([]);
    const { showLoader, hideLoader, isLoading } = useAppContext();

    const handleLotteryRange = async () => {
        const data = await LotteryRange();
        SetAllActiveMarket(data?.data);
        setFilteredMarket(data?.data[0]);
        setLotteryRange({
            group_start: data?.data[0]?.group_start,
            group_end: data?.data[0]?.group_end,
            series_start: data?.data[0]?.series_start,
            series_end: data?.data[0]?.series_end,
            number_start: data?.data[0]?.number_start,
            number_end: data?.data[0]?.number_end,
        });

        // Initialize the filtered numbers based on the fetched range
        setFilteredNumbers(
            generateNumbers(data.data[0]?.number_start, data.data[0]?.number_end)
        );
        setFilteredGroups(
            generateGroups(data.data[0]?.group_start, data.data[0]?.group_end)
        );
        setFilteredSeries(
            generateSeries(data.data[0]?.series_start, data.data[0]?.series_end)
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            showLoader();
            try {

                await handleLotteryRange();
            } catch (error) {
                console.error("Error fetching lottery markets:", error);
            } finally {
                hideLoader();
            }
        }
        fetchData();

    }, []);

    const handleMarketClick = (market) => {
        // Filter the selected market object from allActiveMarket
        const filteredObject = allActiveMarket.find((item) => item.id === market.id);
        setFilteredMarket(filteredObject);
        setLotteryRange({
            group_start: filteredObject.group_start,
            group_end: filteredObject.group_end,
            series_start: filteredObject.series_start,
            series_end: filteredObject.series_end,
            number_start: filteredObject.number_start,
            number_end: filteredObject.number_end,
        });

        // Initialize the filtered numbers based on the fetched range
        setFilteredNumbers(
            generateNumbers(filteredObject.number_start, filteredObject.number_end)
        );
        setFilteredGroups(
            generateGroups(filteredObject.group_start, filteredObject.group_end)
        );
        setFilteredSeries(
            generateSeries(filteredObject.series_start, filteredObject.series_end)
        );
    };

    return (
        <Container fluid className="alt-dashboard-container">
            {/* Sidebar */}
            <aside className="alt-sidebar p-4">
                <h5 className="text-center text-white">Lottery Markets</h5>
                <div className="market-card-grid">
                    {allActiveMarket.length > 0 ? (
                        allActiveMarket.map((market) => (
                            <Card
                                key={market.id}
                                className="market-card"
                                onClick={() => handleMarketClick(market)}
                            >
                                <Card.Body>
                                    <Card.Title>{market.marketName}</Card.Title>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ minHeight: "480px", width: "100%" }}
                        >
                            <h4 className="text-center fw-bold bg-white p-5 rounded-5">
                                No <br />
                                Market <br />
                                Available
                            </h4>
                        </div>

                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="alt-main-content p-4">
                {filteredMarket ? (
                    <Card className="welcome-card shadow-sm">
                        <Search
                            filteredNumbers={filteredNumbers}
                            filteredGroups={filteredGroups}
                            filteredSeries={filteredSeries}
                            setFilteredNumbers={setFilteredNumbers}
                            setFilteredGroups={setFilteredGroups}
                            setFilteredSeries={setFilteredSeries}
                            lotteryRange={lotteryRange}
                        />
                    </Card>
                ) : (
                    <Card className="welcome-card shadow-sm">
                        <Card.Body>
                            {!isLoading && <Card.Title className="welcome-title">
                                No Market Available
                            </Card.Title>}


                        </Card.Body>
                    </Card>
                )}
            </main>

        </Container>
    );
};

export default SearchLottery;
