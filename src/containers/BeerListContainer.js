import { connect } from 'react-redux';
import BeerList from './../components/BeerList';
import { requestFetchBeer } from './../actions/beer';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    isLoading: state.beer.isLoading,
    beerList: state.beer.list,
    error: state.beer.error
});

const mapDispatchToProps = (dispatch) => ({
    fetchBeer: (history) => {
        dispatch(requestFetchBeer(history));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerList);