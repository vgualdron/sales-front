export default function () {
  return {
    news: [],
    newsReds: [],
    new: {},
    responseMessages: [],
    status: false,
    userSelectedReview: localStorage.getItem('userSelectedReview') ? parseInt(localStorage.getItem('userSelectedReview'), 10) : 0,
    sectorSelectedReview: localStorage.getItem('sectorSelectedReview') ? JSON.parse(localStorage.getItem('sectorSelectedReview')) : [],
    userSelectedReds: localStorage.getItem('userSelectedReds') ? parseInt(localStorage.getItem('userSelectedReds'), 10) : 0,
    sectorSelectedReds: localStorage.getItem('sectorSelectedReds') ? JSON.parse(localStorage.getItem('sectorSelectedReds')) : [],
  };
}
