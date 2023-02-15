from datetime import datetime
from pydantic import BaseModel
from decimal import Decimal

def product_measurement_schema_function(product_measurement)->dict:
  return {
    "id"          : product_measurement.id,
    "product_id"  : product_measurement.product_id.id,
    "depth"       : product_measurement.depth,
    "width"       : product_measurement.width,
    "height"      : product_measurement.height,
    "created_at"  : product_measurement.created_at,
    "updated_at"  : product_measurement.updated_at,
    "state"       : product_measurement.state
  }

def products_measurement_function(product_measurements)->list:
  return [product_measurement_schema_function(product_measurement) for product_measurement in product_measurements]

class ProductMeasurement(BaseModel):
  id:         int
  product_id: int
  depth:      Decimal
  width:      Decimal
  height:     Decimal
  state:      bool

class ProductMeasurementFull(ProductMeasurement):
  created_at: datetime
  updated_at: datetime