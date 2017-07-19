import { connect } from 'react-redux';
import BeerPagination from './../components/BeerPagination';
import { goToNextPage } from './../actions/pagination';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    isEnabled: (state.pagination.isEnabled && !state.beer.listError)
});

const mapDispatchToProps = (dispatch) => ({
    goToNextPage: (queryStr) => {
        dispatch(goToNextPage(queryStr));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerPagination);