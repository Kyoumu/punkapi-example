import { connect } from 'react-redux';
import BeerList from './../components/BeerList';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    isLoading: state.beer.isLoadingList,
    beerList: state.beer.currentList,
    error: state.beer.listError
});

const mapDispatchToProps = (dispatch) => ({
    onBeerClick: (beer, history) => {
        history.push('/beer/' + beer.id, {fromList: true});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerList);