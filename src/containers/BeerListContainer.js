import { connect } from 'react-redux';
import BeerList from './../components/BeerList';
import { requestFetchBeer } from './../actions/beer';

const mapStateToProps = (state) => ({
    isLoading: state.beer.isLoading,
    beerList: state.beer.list,
    error: state.beer.error
});

const mapDispatchToProps = (dispatch) => ({
    fetchBeer: () => {
        dispatch(requestFetchBeer());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerList);