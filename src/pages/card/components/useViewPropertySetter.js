export default function useViewPropertySetter(face, refreshCampaign) {
    return (propertyName) => {
        return (value) => {
            face[propertyName] = value;
            refreshCampaign();
        };
    };
}
