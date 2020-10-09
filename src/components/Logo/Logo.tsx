import React from 'react';
import './Logo.css';

export const Logo = ({ withoutText = false, className = '' }) => {
	return (
		<a href="/" className={`flex ${className}`}>
			{!withoutText && (
				<h1 className="text-white text-1xl my-6 mr-2 sm:text-4xl sm:my-3 sm:mr-3 left-align">
					NorbChat
				</h1>
			)}
			<img
				alt="chat logo"
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADdElEQVRoge2ZO24UQRCG/97FNhERC3YKmVPugci4AkggHhISGTdARlg44AakHIArICERE9niIT8CwJLl/gl6eqb63TszuyuhbWnlHVd1d1V9VTXTs8B6rMd6rMcqhypqvPh8Xym8BTADCQUCIEDzV5FGz8rYyY0uPF05F+Y6KvPmdrIf1Hj89/3dDwAwKXqosA9wpqihoM0iNBuo5jtamXaNt7LmI2XGQN3K7bquM2ZdKVfkjYnivrXvSpHAn5PrbdThRwfxqNtrwImsqwuPptSFS0gRaroJTDes7izpwJ1PJ/dAdQBg26xHu14zl8Jes3G3LxN63rWj16wT1TOLX56f4+zLV1yc/QamG10AEUsh4h2IbTbIHGPJJksINjI2su66+a5jMoQy7a8TytTmVVzb3QUuzru0TREg1Y4bdUqqXtQpoujT8uj48+akqra2AF42dZF1IIVT/D+XLhCO9UiXuJ65bhtHzoFk1KObhFHPEsmRlESSJDVM5+rMjRKowp5LlwXRAllRA3pc7HFDE/MKtNr7ULEGZNRHSImhBWznGQK65EBksrOJT6EHrdy8DC3/xpcmMA/2XBrUkpSBK9RdsY1WFekIKZG/iydIoqKNOl0ooNAjXYq0InQSVO0G8lEi0YUSC0siuXRZEMm2iIs1IDdxOoFPYdziDom7gfSfdBMOFAwobNL/Ll5BS54rUg6k0I5ZwNl5GeLuqS1JIFV84/b0WlquzJ7gOnujKbSsnp6cl6DVHUULBGpToipdakkGeiER+8mfB/SwTQI6c6RLnJbUEy8WsgSiC0UWllEfo7gdPT+QxITsJqYcKHaGgIJLa5xnqRRJ20a7UdeFZNSr0mUxtCrbaIUBiS6RJTdXusRptUVM/swSKKKdMyXGKWBzIlPQ30k8yhKITR67p/eh9evjq+BdbqSNZgzogb03yRiFyIh1oSMCO/kiHZ4S8xYwwcOYA8GrRWr1kOSRLWbzeo9tcTvfczIKmQ5lraNaXIvXlk7akYfQkwcxB8q/DyTGzYNv4pyRSBdy7/jJredQ8vFr3FF+vZ4YcdROuizceGCQA9niXorxwFgERAGD2Dt+uhzjgQEOQIcdZNnGAwMJyLapsHzjgYE10HYdYO9kBcYDFb9SpgaJy6YG3pyuyHhgAAEN9VJB8/TZ7derMv6/GP8Al3B5Hmm6ePUAAAAASUVORK5CYII="
			/>
		</a>
	);
};
