import { useWindowDimensions } from 'react-native'

function useWindowDimens() {
    const {height, width} = useWindowDimensions();

    return {
        windowHeight: height,
        windowWidth: width,
    }
}

export default useWindowDimens