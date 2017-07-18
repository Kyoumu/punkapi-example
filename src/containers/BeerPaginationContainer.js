import { connect } from 'react-redux';
import BeerPagination from './../components/BeerPagination';
import { goToNextPage } from './../actions/pagination';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    isEnabled: state.pagination.isEnabled
});

const mapDispatchToProps = (dispatch) => ({
    goToNextPage: (history) => {
        dispatch(goToNextPage(history));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerPagination);