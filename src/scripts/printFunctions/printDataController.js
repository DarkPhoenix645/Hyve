import PrintData from './PrintData';

function errorHandler(err) {
    if (err === 'EUnknown') {
        return { code: 500, message: 'An unknown error occurred', shorthand: 'EUnknown' };
    } else if (err === 'EDoesNotExist') {
        return { code: 404, message: 'The requested document does not exist', shorthand: 'EDoesNotExist' };
    } else { return 'No Error' }
}

async function create(req, res) {
    const { uid, printer, priority } = req.body;
    try {
        const printData = await PrintData.create({userId: uid, defaultPrinterName: printer, userPriority: priority});
        res.status(201).json({ printData });
    } catch (error) {
        res.status(400).json({ "code": error.code, "message": error.message });
    };
};

async function update(req, res) {
    const { uid, printer, priority } = req.body;
    try {
        const printData = new PrintData();
        const result = await printData.update(uid, printer, priority);
        const error = errorHandler(result);
        error === 'No Error' ? res.status(201).json({ result }) : res.status(error.code).json({ error: error.message, shorthand: error.shorthand });
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'An internal server error occurred.' })
    }
};

async function get(req, res) {
    const { uid } = req.body;
    try {
        const userData = new PrintData.get(uid, printer, priority);
        const error = errorHandler(userData);
        error === 'No Error' ? res.status(201).json({ userData }) : res.status(error.code).json({ error: error.message, shorthand: error.shorthand });
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'An internal server error occurred.' })
    }
};

async function reset(req, res) {
    const { uid } = req.body;
    try {
        const printData = new PrintData();
        const result = await printData.update(uid, 'Deskjet-1050-J410-series', 1);
        const error = errorHandler(result);
        error === 'No Error' ? res.status(201).json({ result }) : res.status(error.code).json({ error: error.message, shorthand: error.shorthand });
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'An internal server error occurred.' })
    }
};

export default {
    create,
    update,
    get,
    reset
};