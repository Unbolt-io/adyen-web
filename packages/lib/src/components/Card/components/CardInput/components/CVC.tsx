import { h } from 'preact';
import classNames from 'classnames';
import CVCHint from './CVCHint';
import Field from '../../../../internal/FormFields/Field';
import useCoreContext from '../../../../../core/Context/useCoreContext';
import { CVCProps } from './types';
import styles from '../CardInput.module.scss';
import { CVC_POLICY_HIDDEN, CVC_POLICY_OPTIONAL, CVC_POLICY_REQUIRED } from '../../../../internal/SecuredFields/lib/configuration/constants';
import DataSfSpan from './DataSfSpan';

export default function CVC(props: CVCProps) {
    const {
        label,
        onFocusField = () => {},
        error = '',
        className = '',
        classNameModifiers = [],
        focused,
        filled,
        isValid,
        frontCVC = false,
        cvcPolicy = CVC_POLICY_REQUIRED
    } = props;
    const { i18n } = useCoreContext();

    const fieldClassnames = classNames(className, {
        'adyen-checkout__field__cvc': true,
        [styles['adyen-checkout__card__cvc__input--hidden']]: cvcPolicy === CVC_POLICY_HIDDEN,
        'adyen-checkout__field__cvc--optional': cvcPolicy === CVC_POLICY_OPTIONAL
    });

    const cvcClassnames = classNames({
        'adyen-checkout__input': true,
        'adyen-checkout__input--small': true,
        'adyen-checkout__card__cvc__input': true,
        'adyen-checkout__input--error': error,
        'adyen-checkout__input--focus': focused,
        'adyen-checkout__input--valid': isValid,
        [styles['adyen-checkout__input']]: true
    });

    const fieldLabel = cvcPolicy !== CVC_POLICY_OPTIONAL ? label : i18n.get('creditCard.cvcField.title.optional');

    return (
        <Field
            label={fieldLabel}
            focused={focused}
            filled={filled}
            classNameModifiers={[...classNameModifiers, 'securityCode']}
            onFocusField={() => onFocusField('encryptedSecurityCode')}
            className={fieldClassnames}
            errorMessage={error && i18n.get(error)}
            isValid={isValid}
            dir={'ltr'}
            name={'encryptedSecurityCode'}
        >
            <DataSfSpan encryptedFieldType={'encryptedSecurityCode'} className={cvcClassnames} />

            <CVCHint frontCVC={frontCVC} />
        </Field>
    );
}
