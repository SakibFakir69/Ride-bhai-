import React, { useState, useEffect } from 'react';
import { useUserHistoryQuery } from '@/redux/features/user/user.api';
import { ModeToggle } from '@/components/mode-toggle';
import LoadingComponent from '@/utils/utils.loading';

interface Ride {
  _id: string;
  current: string;
  destination: string;
  fare: number;
  payment_status: string;
  rider_status: string;
  driver_status: string;
  createdAt: string;
}

interface RideFilters {
  search: string;
  status: string;
  minFare: string;
  maxFare: string;
  startDate: string;
  endDate: string;
  sortBy: string;
}

interface ApiResponse {
  data: Ride[];
  message: string;
  meta: {
    limit: number;
    page: number;
    totalDocs: number;
    totalPages: number;
  };
}

function RideHistory() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState<RideFilters>({
    search: '',
    status: '',
    minFare: '',
    maxFare: '',
    startDate: '',
    endDate: '',
    sortBy: 'desc'
  });

  // Prepare query params for API - convert empty strings to undefined
  const queryParams: any = {
    page,
    limit,
    ...(filters.search && { search: filters.search }),
    ...(filters.status && { status: filters.status }),
    ...(filters.minFare && { minFare: Number(filters.minFare) }),
    ...(filters.maxFare && { maxFare: Number(filters.maxFare) }),
    ...(filters.startDate && { startDate: filters.startDate }),
    ...(filters.endDate && { endDate: filters.endDate }),
    sortBy: filters.sortBy
  };

  const { data, isLoading, isError, refetch } = useUserHistoryQuery(queryParams);

  // Reset to page 1 when filters change (except pagination-related ones)
  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.status, filters.minFare, filters.maxFare, filters.startDate, filters.endDate, filters.sortBy]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      minFare: '',
      maxFare: '',
      startDate: '',
      endDate: '',
      sortBy: 'desc'
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <LoadingComponent/>
  }



  const response = data as ApiResponse;
  const rides = response?.data || [];
  const meta = response?.meta || { totalDocs: 0, totalPages: 1, page: 1, limit: 10 };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Ride History</h1>
       
          </div>
         
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Filters</h2>
            <button 
              onClick={handleClearFilters} 
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Clear All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input 
                type="text" 
                name="search" 
                placeholder="Search rides..." 
                value={filters.search} 
                onChange={handleFilterChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                name="status" 
                value={filters.status} 
                onChange={handleFilterChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="cancelled">Cancelled</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select 
                name="sortBy" 
                value={filters.sortBy} 
                onChange={handleFilterChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Items Per Page</label>
              <select 
                value={limit} 
                onChange={e => setLimit(Number(e.target.value))} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Fare</label>
              <input 
                type="number" 
                name="minFare" 
                placeholder="Min fare" 
                value={filters.minFare} 
                onChange={handleFilterChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Fare</label>
              <input 
                type="number" 
                name="maxFare" 
                placeholder="Max fare" 
                value={filters.maxFare} 
                onChange={handleFilterChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                type="date" 
                name="startDate" 
                value={filters.startDate} 
                onChange={handleFilterChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                type="date" 
                name="endDate" 
                value={filters.endDate} 
                onChange={handleFilterChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {rides.length} of {meta.totalDocs} rides
          </p>
          <p className="text-gray-600">
            Page {meta.page} of {meta.totalPages}
          </p>
        </div>

        {/* Ride List */}
        <div className="space-y-4">
          {rides.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="text-blue-500 text-5xl mb-4">
                <i className="fas fa-car-side"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Rides Found</h2>
              <p className="text-gray-600 mb-6">No rides match your current filters.</p>
              <button 
                onClick={handleClearFilters}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            rides.map(ride => {
              const { full, time } = formatDate(ride.createdAt);
              return (
                <div key={ride._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="mb-4 md:mb-0">
                      <p className="text-gray-500 text-sm">Date & Time</p>
                      <p className="text-gray-800 font-medium">{full}</p>
                      <p className="text-gray-600">{time}</p>
                    </div>
                    <div className="md:mx-4 md:flex-1 mb-4 md:mb-0">
                      <div className="flex items-start">
                        <div className="mr-3 flex flex-col items-center pt-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mb-1"></div>
                          <div className="w-0.5 h-10 bg-gray-300"></div>
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">From</p>
                          <p className="text-gray-800 font-medium mb-3">{ride.current}</p>
                          <p className="text-gray-500 text-sm">To</p>
                          <p className="text-gray-800 font-medium">{ride.destination}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <p className="text-gray-500 text-sm">Fare</p>
                        <p className="text-gray-800 font-medium">{ride.fare} BDT</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Payment</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ride.payment_status)}`}>
                          {ride.payment_status}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Rider Status</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ride.rider_status)}`}>
                          {ride.rider_status}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Driver Status</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ride.driver_status)}`}>
                          {ride.driver_status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-3 flex justify-end">
                    <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (meta.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= meta.totalPages - 2) {
                  pageNum = meta.totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-lg border ${page === pageNum ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setPage(prev => Math.min(prev + 1, meta.totalPages))}
                disabled={page === meta.totalPages}
                className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default RideHistory;