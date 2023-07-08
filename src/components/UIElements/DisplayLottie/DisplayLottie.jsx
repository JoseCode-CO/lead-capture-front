import React from "react";
import lottie from "lottie-web";
import s from './DisplayLottie.module.scss';

const DisplayLottie = ({ lottieId, addClass = s.container, rendererSettings = {}, animation }) => {

    React.useEffect(() => {
        let element = document.querySelector(`#${lottieId}`);
        element.innerHTML = '';
        lottie.loadAnimation({
            container: element,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            name: lottieId,
            animationData: animation,
            rendererSettings: rendererSettings
        });
    }, [animation, rendererSettings, lottieId]);

	return (
        <>
            <div id={lottieId} className={addClass}></div>
        </>
	);
};

export default DisplayLottie;
