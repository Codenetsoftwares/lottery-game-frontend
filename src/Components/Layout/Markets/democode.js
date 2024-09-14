<div className="bg-white">
  <div
    className="card text-center mt-2 mr-5 ml-5"
    style={{
      backgroundColor: "#e6f7ff",
      position: "relative",
    }}
  >
    <SingleCard
      style={{
        backgroundColor: "#e6f7ff",
        position: "relative",
        width: "100%",
      }}
    >
      <div className="card-header-pill text-bold d-flex">
        <div className="flex-grow-1  ml-4 mr-5">
          <input
            type="search"
            className="form-control rounded-pill shadow"
            placeholder="Search User by Name..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
    </SingleCard>
    <div className="card-body  mt-2 mb-3">
      <SingleCard className="mb-2 p-4">
        <InfiniteScroll
          style={{ overflowX: "hidden" }}
          dataLength={adminList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "80vh" }}
            >
              <Oval
                height={40}
                width={40}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          }
          height={600}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more data to load</b>
            </p>
          }
        >
          <GridCard columns={3}>
            {adminList.map((data, i) => (
              <div
                key={data?._id}
                className="col d-flex justify-content-center align-items-center "
                onMouseEnter={() => setHoveredCard(data._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`card d-flex justify-content-between ${
                    hoveredCard === data?._id ? "card-hover-shadow" : ""
                  }`}
                  style={{
                    borderRadius: "20px",
                    height: "200px",
                    width: "95%",
                    position: "relative",
                  }}
                  onClick={() => handleCardClick(data?._id)}
                >
                  <div className="card-body">
                    <button
                      type="button"
                      className="btn btn-steel-blue btn-sm btn-hover-zoom fs-4"
                      data-toggle="modal"
                      data-target="#subadminProfile"
                      onClick={() => {
                        handleProfileView(data._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} className="add-icon" />
                    </button>
                    <p
                      className="font-weight-bold fs-4 text-truncate mt-3"
                      style={{ color: "#708090" }}
                    >
                      {data?.userName}
                    </p>
                    <div className="container">
                      <div>
                        <button
                          type="button"
                          className="btn btn-steel-blue btn-sm btn-hover-zoom font-weight-bold "
                          style={{
                            fontFamily: "'Abril Fatface', serif ",
                            textDecoration: "underline",
                          }}
                          onClick={(e) => {
                            handelDetails(e, data._id);
                          }}
                        >
                          Click here for more details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </GridCard>
        </InfiniteScroll>
      </SingleCard>
    </div>
  </div>
  <SubAdminProfileView data={profileView} />
</div>;
