import format from 'pg-format'
import db from '../db/index.js'

export const checkExists = async (table, column, value) => {
    // %I is an identifier in pg-format
    const queryStr = format('SELECT * FROM %I WHERE %I = $1;', table, column)
    const dbOutput = await db.query(queryStr, [value])

    if (dbOutput.rows.length === 0) {
        // resource does NOT exist
        throw { status: 404, msg: 'Not Found' }
    }
}
