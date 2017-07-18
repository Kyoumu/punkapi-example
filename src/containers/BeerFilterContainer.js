import { connect } from 'react-redux';
import BeerFilter from './../components/BeerFilter';
import { setItemPerPage, setABV, setBeerName } from './../actions/filter';

const mapStateToProps = (state) => ({
    itemsPerPage: state.filter.itemsPerPage,
    minABV: state.filter.minABV,
    maxABV: state.filter.maxABV,
    beerName: state.filter.beerName
});

const mapDispatchToProps = (dispatch) => ({
    setItemPerPage: (selected) => {
        dispatch(setItemPerPage(selected.value));
    },
    changeABV: ([min, max]) => {
        dispatch(setABV({min, max}));
    },
    changeMinABV: (e) => {
        dispatch(setABV({min: e.target.value}));
    },
    changeMaxABV: (e) => {
        dispatch(setABV({max: e.target.value}));
    },
    setBeerName: (e) => {
        dispatch(setBeerName(e.target.value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerFilter);