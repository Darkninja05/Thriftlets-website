import faker

def generate_sql_insert(num_rows=5):
  """
  Generates SQL INSERT statements for suppliers. 
  
  Args:
      num_rows: The number of rows to generate. 
  
  Returns:
      A list of SQL INSERT statements.
  """
  sql_statements = []
  fake = faker.Faker() # Create the Faker object inside the function
  for _ in range(num_rows):
    supplier_name = fake.name()
    address = fake.address()
    email = fake.email()
    # Use the specific format for Philippine phone numbers
    phone_number = f"+63{fake.random_number(digits=9)}"
    sql_statement = f"INSERT INTO `suppliers` (`supplier_name`, `phone_number`, `address`, `email`) VALUES ('{supplier_name}', '{phone_number}', '{address}', '{email}');"
    sql_statements.append(sql_statement)
  return sql_statements

# Generate 5 SQL INSERT statements
sql_inserts = generate_sql_insert(50)  # Call the function to generate the statements

# Print the generated statements
for statement in sql_inserts:
  print(statement)