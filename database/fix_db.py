import psycopg2

# Database connection parameters
db_credentials = {
}

def drop_tables(conn):
    """Drop all tables if they exist."""
    drop_queries = [
        "DROP TABLE IF EXISTS users CASCADE;",
    ] 
    with conn.cursor() as cur:
        for query in drop_queries:
            cur.execute(query)
        print("All tables dropped successfully.")
        conn.commit()

def create_tables(conn):
    """Create all tables with the correct schema."""
    try:
        with open('./user_service/db_schema.sql', 'r') as file:
            create_script = file.read()
        with conn.cursor() as cur:
            cur.execute(create_script)
            conn.commit()
            print("All tables created successfully.")
    except Exception as e:
        conn.rollback()
        print(f"An error occurred: {e}")

def main():
    """Main function to drop and recreate all tables."""
    try:
        # Establish the database connection
        conn = psycopg2.connect(**db_credentials)
        print("Connected to the database successfully.")
        
        # Drop all existing tables
        drop_tables(conn)
        
        # Recreate all tables with the correct schema
        create_tables(conn)
        
    except Exception as e:
        print(f"An error occurred: {e}")
        
    finally:
        if conn:
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    main()
