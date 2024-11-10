import faker
import random

def generate_sql_insert(num_rows=5):
  """
  Generates SQL INSERT statements for products.

  Args:
      num_rows: The number of rows to generate.

  Returns:
      A list of SQL INSERT statements.
  """
  sql_statements = []
  fake = faker.Faker()
  product_types = {
    "Fabrics": ["Cotton", "Linen", "Silk", "Wool", "Polyester", "Denim", "Velvet", "Jersey", "Fleece", "Satin"],
    "Threads": ["Cotton Thread", "Polyester Thread", "Embroidery Thread", "Nylon Thread", "Silk Thread", "Quilting Thread"],
    "Notions": ["Zippers", "Buttons", "Snaps", "Hooks and Eyes", "Elastic", "Bias Tape", "Ribbons", "Velcro", "Interfacing", "Lace and Trim"],
    "Tools": ["Sewing Machine", "Needles", "Pins", "Scissors", "Rotary Cutter", "Measuring Tape", "Seam Ripper", "Thimbles", "Cutting Mat", "Marking Tools"] 
  }

  for _ in range(num_rows):
    product_type = random.choice(list(product_types.keys()))
    product_name = random.choice(product_types[product_type])
    supplier_id = random.randint(1, 50)
    
    # Color generation
    if product_type in ["Fabrics", "Threads", "Notions"]:
      color = fake.color_name()
    else:
      color = "NULL"  # Set color to NULL for other product types
    
    unit_price = round(random.uniform(1.0, 100.0), 2) # generate a random float with 2 decimal places
    
    sql_statement = f"INSERT INTO `products` (`supplier_id`, `product_name`, `product_type`, `color`, `unit_price`) VALUES ('{random.randint(1, 50)}', '{product_name}', '{product_type}', '{color}', {unit_price});"
    sql_statements.append(sql_statement)
  return sql_statements

# Generate 5 SQL INSERT statements
sql_inserts = generate_sql_insert(50)  # Call the function to generate the statements

# Print the generated statements
for statement in sql_inserts:
  print(statement)