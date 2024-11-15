import React, { useEffect, useState } from 'react'
import Search from '../../Search/Search';
import "./searchLottery.css"
import { Card, Col, Row, Container, Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getLotteryRange } from '../../../Utils/getInitialState';
import { LotteryRange } from '../../../Utils/apiService';
import { generateGroups, generateNumbers, generateSeries } from '../../../Utils/helper';

const SearchLottery = () => {
    const [lotteryRange, setLotteryRange] = useState(getLotteryRange);
    const [allActiveMarket, SetAllActiveMarket] = useState([])
    const [filteredMarket, setFilteredMarket] = useState(null);
    const [filteredNumbers, setFilteredNumbers] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [filteredSeries, setFilteredSeries] = useState([]);

    const handleLotteryRange = async () => {
        const data = await LotteryRange();
        SetAllActiveMarket(data?.data)
        setFilteredMarket(data?.data[0])
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
        handleLotteryRange();
    }, []);

    const handleMarketClick = (market) => {
        // Filter the selected market object from allActiveMarket
        const filteredObject = allActiveMarket.find((item) => item.id === market.id);
        setFilteredMarket(filteredObject)
        setLotteryRange({
            group_start: filteredMarket.group_start,
            group_end: filteredMarket.group_end,
            series_start: filteredMarket.series_start,
            series_end: filteredMarket.series_end,
            number_start: filteredMarket.number_start,
            number_end: filteredMarket.number_end,
        });

        // Initialize the filtered numbers based on the fetched range
        setFilteredNumbers(
            generateNumbers(filteredMarket.number_start, filteredMarket.number_end)
        );
        setFilteredGroups(
            generateGroups(filteredMarket.group_start, filteredMarket.group_end)
        );
        setFilteredSeries(
            generateSeries(filteredMarket.series_start, filteredMarket.series_end)
        );
    };

    console.log("filteredMarket", filteredMarket)

    return (
        <Container fluid className="alt-dashboard-container">
            {/* Sidebar */}
            <aside className="alt-sidebar p-4">
                <h5 className="text-center text-white">Lottery Markets</h5>
                <div className="market-card-grid">
                    {allActiveMarket.map((market) => (
                        <Card
                            key={market.id}
                            className="market-card"
                            onClick={() => handleMarketClick(market)}
                        >
                            <Card.Body>
                                <Card.Title>{market.marketName}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="alt-main-content p-4">
                <Card className="welcome-card shadow-sm">
                    <Search filteredNumbers={filteredNumbers} filteredGroups={filteredGroups} filteredSeries={filteredSeries} setFilteredNumbers={setFilteredNumbers} setFilteredGroups={setFilteredGroups} setFilteredSeries={setFilteredSeries} lotteryRange={lotteryRange} />
                </Card>
            </main>
        </Container>
    )
}

export default SearchLottery