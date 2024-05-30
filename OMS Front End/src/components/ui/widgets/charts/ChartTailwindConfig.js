import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
    // Tailwind config
    return resolveConfig('../.././../../tailwind.config.js')
}

export const generateColorArray = (dataValues) => {
    const colors = [];
    const alpha = 0.7; // You can adjust the alpha value as needed

    // Check if dataValues is an array and has length
    if (Array.isArray(dataValues) && dataValues.length > 0) {
        for (let i = 0; i < dataValues.length; i++) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            colors.push(color);
        }
    } else {
        // If dataValues is not valid, generate random colors for 100 data points
        for (let i = 0; i < 100; i++) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            colors.push(color);
        }
    }

    return colors;
};

