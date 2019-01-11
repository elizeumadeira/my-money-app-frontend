import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';

import { init } from './billingCyclesActions';
import labelAndInput from '../common/form/labelAndInput';
import ItemList from './ItemList';
import Summary from './Summary'

class BillingCycleForm extends Component {

    calculateSummary() {
        const sum = (t, v) => t + v;
        const cr = this.props.credits || [];
        const db = this.props.debts || [];
        return {
            sumOfCredits: cr.length > 0 ? cr.map(c => +c.value || 0).reduce(sum) : 0,
            sumOfDebits: db.length > 0 ? db.map(d => +d.value || 0).reduce(sum) : 0
        }
    }

    render() {
        const { handleSubmit, readOnly, credits, debts } = this.props;
        const { sumOfCredits, sumOfDebits } = this.calculateSummary();
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} type='text' readOnly={readOnly} label="Nome" cols='12 4' placeholder='Informe o Nome' />
                    <Field name='month' component={labelAndInput} type='number' readOnly={readOnly} label="Mês" cols='12 4' placeholder='Informe o Mês' />
                    <Field name='year' component={labelAndInput} type='number' readOnly={readOnly} label="Mês" cols='12 4' placeholder='Informe o Ano' />
                    <Summary credit={sumOfCredits} debt={sumOfDebits} />
                    <ItemList cols='12 6' list={credits} readOnly={readOnly} field='credits' legend='Créditos' />
                    <ItemList cols='12 6' list={debts} readOnly={readOnly} field='debts' legend='Débitos' showStatus={true} />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm);
const selector = formValueSelector('billingCycleForm');
const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts')
});
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm);