const branches = [
    { id: 1, name: 'Branch A', latitude: 70.7749, longitude: -200.4194 },
    { id: 2, name: 'Branch B', latitude: 34.0522, longitude: -118.2437 },
];


module.exports.get_nearestBranch = (req, res) => {
    try {
        
        const { latitude, longitude } = req.body.location;

      
        const nearestBranch = findNearestBranch(latitude, longitude);

        res.json({ nearestBranch });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

function findNearestBranch(customerLat, customerLng) {
    let nearestBranch = null;
    let minDistance = Infinity;

    for (const branch of branches) {
        const branchLat = branch.latitude;
        const branchLng = branch.longitude;

        
        const distance = Math.sqrt((customerLat - branchLat) ** 2 + (customerLng - branchLng) ** 2);

        
        if (distance < minDistance) {
            minDistance = distance;
            nearestBranch = branch;
        }
    }

    return nearestBranch;
}

