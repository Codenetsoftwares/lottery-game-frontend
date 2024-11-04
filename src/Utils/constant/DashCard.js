const DashCard = [
    {
        name: "Create Lottery",
        description: "Easily create new lotteries with different timings.",
        buttonName: "Go to Create",
        buttonLink: "/lottery-markets",
        cardstyle: {
            borderRadius: '20px',
            backgroundColor: '#FFB7B2',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        icon: "fas fa-ticket-alt", // icon for Create Lottery
    },
    {
        name: "Purchased History",
        description: "View the purchase history of all users.",
        buttonName: "View History",
        buttonLink: "/purchase-history",
        cardstyle: {
            borderRadius: '20px',
            backgroundColor: '#FF677D',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        icon: "fas fa-history", // icon for Purchase History
    },
    {
        name: "Search Lottery",
        description: "Search for created lotteries quickly.",
        buttonName: "Search",
        buttonLink: "/search-lottery",
        cardstyle: {
            borderRadius: '20px',
            backgroundColor: '#FF9AA2',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        icon: "fas fa-search", // icon for Search Lottery
    },
    {
        name: "View Results",
        description: "Check results for today and the past 3 months.",
        buttonName: "View Results",
        buttonLink: "/results",
        cardstyle: {
            borderRadius: '20px',
            backgroundColor: '#D4A5A5',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        icon: "fas fa-trophy", // icon for View Results
    },
    {
        name: "Authorize Win",
        description: "Authorize winning options for lotteries.",
        buttonName: "Authorize",
        buttonLink: "/win",
        cardstyle: {
            borderRadius: '20px',
            backgroundColor: '#B9FBC0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        icon: "fas fa-money-bill-wave", // icon for Authorize Win
    },

    {
        name: "Lucky Hour",
        description: "Create and manage multiple draw times for lotteries each day for a more dynamic experience!",
        buttonName: "Set Lucky Hour",
        buttonLink: "/lucky-hour",
        cardstyle: {
            borderRadius: '20px',
            backgroundColor: '#4B9CD3',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            color: '#fff',
        },
        icon: "fas fa-hourglass-half", // icon for Lucky Hour
    },
];
export default DashCard;