import { connect } from 'react-redux';
import { requestFetchBeerItem } from './../../actions/beer';
import Beer from './../../components/screens/Beer';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    beer: state.beer.totalList[ownProps.match.params.id],
    isLoading: state.beer.itemLoadings[ownProps.match.params.id],
    error: state.beer.itemErrors[ownProps.match.params.id]
});

const mapDispatchToProps = (dispatch) => ({
    fetchBeer: (id) => {
        dispatch(requestFetchBeerItem(id));
    },
    goToList: (history) => {
        if (history.location.state && history.location.state.fromList) {
            history.goBack();
        } else {
            history.push('/beer/');
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Beer);