import React, { useEffect, useState } from 'react';
import styles from './formInput.module.scss';

interface InputTypes {
	name: string;
	label: string;
	ref: React.Ref<HTMLInputElement>;
	onChange: (value: string) => void;
	value?: unknown;
}

export const FormInput = React.forwardRef<HTMLInputElement, InputTypes>(({ name, label, onChange, value }, ref) => {
	const [isActive, setIsActive] = useState(false);

	const inputType = name === 'password' ? 'password' : 'text';

	const activeClass = isActive && styles.active;

	const valueForTs = value as string;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	useEffect(() => {
		if (value) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [value]);

	return (
		<div className={styles['input-group']}>
			<input
				data-testid='forminput-input'
				value={valueForTs || ''}
				className={styles.input}
				type={inputType}
				name={name}
				id={name}
				ref={ref}
				onChange={handleChange}
			/>
			<label data-testid='forminput-label' className={`${styles.placeholder} ${activeClass}`} htmlFor={name}>
				{label}
			</label>
		</div>
	);
});
